import axios from 'axios'

const BASE_URL = process.env.ROOT_API

/**
 *
 *
 *
 * @param formData
 * @returns {Promise<AxiosResponse<any> | never>}
 */
function createCloud(formData) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  .then(x => x.data)
}

function getCloud(jsonBody) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"
  return axios.get(url, jsonBody)
  .then(x=>x.data)
}

function readFileCloud(id) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"+ id
  return axios.get(url,{responseType: 'blob'}).then((response)=>{
    let blob = new Blob([response], { type: 'application/octet-stream' }),
      url = window.URL.createObjectURL(blob)

    window.open(url)
  })
}



export {createCloud, getCloud, readFileCloud}
