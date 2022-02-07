import Docxtemplater from 'docxtemplater'
import ImageModule from 'docxtemplater-image-module-free'
import PizZip from 'pizzip'
import PizZipUtils from 'pizzip/utils/index'
import { saveAs } from 'file-saver'

export default function(params) {
  const { url, data, title = '导出文档' } = params

  PizZipUtils.getBinaryContent(url, function(error, context) {
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
      const outWord = doc.getZip().generate({
        type: 'blob',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      })
      saveAs(outWord, `${title}.docx`)
    })
  })
}
