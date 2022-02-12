import XLSX from 'xlsx'

/**
 * 导出excel表格
 * @param {object} params
 * @param {array}  param.list 数据
 * @param {string} param.fileName 导出的文件名称
 * @param {string} param.type 导出类型; 仅支持 'xlsx' 和 'blob' 类型; 默认 'xlsx' 类型
 * @example
 * exportExcel({
 *   fileName: '2022 - 框出未来',
 *   list: [
 *     {
 *       title: 'sheet1',
 *       data: [
 *         ['姓名', '年龄'],
 *         ['张三', 20],
 *         ['李四', 21],
 *       ]
 *     },
 *     ...
 *   ]
 * })
 */
export default function(params = {}) {
  const { list = [], type = 'xlsx' } = params
  const fileName = `${params.fileName}.xlsx`
  const workbook = XLSX.utils.book_new()

  list.forEach(item => {
    const workSheet = XLSX.utils.aoa_to_sheet(item.data)
    XLSX.utils.book_append_sheet(workbook, workSheet, item.title)
  })

  if (type !== 'blob') XLSX.writeFile(workbook, fileName)
  else {
    // 导出blob 对象, 结合jszip, 导出多个文件的压缩包
    const wbout = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' })
    const fileData = new Blob([wbout], { type: 'application/octet-stream' })
    return { fileName, fileData }
  }
}
