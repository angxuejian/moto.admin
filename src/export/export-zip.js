import JsZip from 'jszip'
import { saveAs } from 'file-saver'

/**
 * 导出 zip
 * @param {object} params
 * @param {array}  param.list 导出数据 [{ fileName, fileData }] fileData为blob类型的数据对象
 * @param {string} param.fileName 导出文件名称
 * @example
 * exportZip({
 *   list: [
 *     { fileName: '文件名称.docx', fileData: {} },
 *     ...
 *   ],
 *   fileName: '2022 - 框出未来'
 * })
 */
export default async function(params) {
  const { list, fileName = '导出压缩包' } = params
  const zip = new JsZip()
  list.forEach(item => { zip.file(item.fileName, item.fileData, { binary: true }) })

  const result = await zip.generateAsync({ type: 'blob' })

  saveAs(result, `${fileName}.zip`)
}
