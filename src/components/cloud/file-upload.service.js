import axios from 'axios'
import saveAs from 'file-saver';

const BASE_URL = process.env.ROOT_API

/**
 *
 * 등록
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
  .then(res => res.data)
}

/**
 *
 * 파일 등록
 *
 * @param formData
 * @param onUploadProgress
 * @returns {Promise<AxiosResponse<any> | never>}
 */
function createFileCloud(formData, onUploadProgress) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"
  return axios.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    onUploadProgress
  })
  .then(res => res.data)
}

/**
 *
 * 읽기
 *
 * @param jsonBody
 * @returns {Promise<AxiosResponse<any> | never>}
 */
function getCloud(jsonBody) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"
  return axios.get(url, jsonBody)
  .then(res=>res.data)
}

/**
 *
 * 파일 읽기
 *
 * @param id
 * @param fileName
 * @returns {Promise<AxiosResponse<any> | never>}
 */
function readFileCloud(id, fileName) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"+ id
  return axios.get(url,{responseType: 'blob'}).then((response)=>{
    const blob = new Blob([response.data]);
    saveAs(blob, fileName);
  }).catch(e=>{
    alert(e);
  })
}

/**
 *
 * 파일 읽기
 *
 * @param id
 * @returns {Promise<AxiosResponse<any> | never>}
 */
function readBlobCloud(id) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"+ id
  return axios.get(url,{responseType: 'blob'}).then((response)=>response.data).catch(e=>{
    alert(e);
  })
}

function renameCloud(id, rename) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"+ id
  return axios.put(url,{
    rename: rename
  }).then(res=>res.data)
}

function deleteCloud(id) {
  const url = `${BASE_URL}`+"/grepiu/cloud/"+ id
  return axios.delete(url).then(res=>res.data)
}


export {createCloud, createFileCloud, getCloud, readFileCloud, readBlobCloud, deleteCloud, renameCloud}
