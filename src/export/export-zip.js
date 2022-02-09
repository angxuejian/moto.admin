import JsZip from 'jszip'
import { saveAs } from 'file-saver'

export default async function(params) {
  const { fileName, fileData, zipName } = params
  const zip = new JsZip()

  zip.file(fileName, fileData)

  const result = await zip.generateAsync({ type: 'blob' })

  saveAs(result, `${zipName}.zip`)
}
