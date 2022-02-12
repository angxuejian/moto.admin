import Docxtemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index'
import { saveAs } from 'file-saver'

/**
 * 导出word文档
 * @param {object} params
 * @param {string} param.template 模板文件的地址路径
 * @param {string} param.fileName 导出的文件名称
 * @param {object} param.data 模板文件的数据, 对应模板文件中的 key
 * @param {string} param.type 导出类型; 仅支持 'xlsx' 和 'blob' 类型; 默认 'xlsx' 类型
 * @example
 * exportWord({
 *   template: 'xx/xx.docx',
 *   fileName: '2022 - 框出未来',
 *   data: { ... },
 * })
 */
export default function(params) {
  const { template, data, type = 'docx' } = params
  const fileName = `${params.fileName || '导出文档'}.docx`

  return new Promise((resolve) => {
    PizZipUtils.getBinaryContent(template, function(error, context) {
      if (error) throw error

      const imageOpts = {
        centered: false,
        getImage: function(tagValue, tagName) {
          return new Promise((resolve, reject) => {
            PizZipUtils.getBinaryContent(tagValue, (err, context) => {
              if (err) return reject(err)
              return resolve(context)
            })
          })
        },
        getSize: function(img, tagValue, tagName) {
          return [600, 400]
          // return new Promise((resolve, reject) => {
          //   const image = new Image()
          //   image.src = tagValue
          //   image.onload = () => resolve([image.width, image.height])
          //   image.onerror = () => resolve([375, 250])
          // })
        },
      }
      const img = new ImageModule(imageOpts)
      const zip = new PizZip(context)
      const doc = new Docxtemplater()

      doc.loadZip(zip)
      doc.attachModule(img)
      doc.compile()

      doc.resolveData(data).then(() => {
        doc.render()
        const outOpts = { type: 'blob', mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' }
        const outWord = doc.getZip().generate(outOpts)
        if (type !== 'blob') saveAs(outWord, fileName)
        else {
          // 导出blob 对象, 结合jszip, 导出多个文件的压缩包
          resolve({ fileName, fileData: outWord })
        }
      })
    })
  })
}
