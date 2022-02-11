import XLSX from 'xlsx'
// import { saveAs } from 'file-saver'
// import JsZip from 'jszip'
// function s2ab(s) {
//   var buf = new ArrayBuffer(s.length)
//   var view = new Uint8Array(buf)
//   for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
//   return buf
// }
export default function(params = {}) {
  const { list = [], fileName = '' } = params
  const workbook = XLSX.utils.book_new()

  list.forEach(item => {
    const workSheet = XLSX.utils.aoa_to_sheet(item.data)
    XLSX.utils.book_append_sheet(workbook, workSheet, item.title)
  })

  XLSX.writeFile(workbook, `${fileName}.xlsx`)

  // 转换为 Blob数据，saveAs 导出文件
  // const wbout = XLSX.write(workbook, {
  //   bookType: 'xlsx',
  //   bookSST: false,
  //   type: 'binary',
  // })
  // const blobWb = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  // saveAs(blobWb, `${fileName}.xlsx`)

  // 将转换为 Blob数据的excel文件，放入 zip中导出
  // const zip = new JsZip()
  // zip.file(blobWb)
  // const result = await zip.generateAsync({ type: 'blob' })
  // saveAs(result, `${fileName}.zip`)
}
