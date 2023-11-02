import axios, { AxiosResponse } from "axios"

enum Addresses {
   COMMENTS_URL = 'https://jsonplaceholder.typicode.com/comments'
}

interface FetchDataType {
   postId: number,
   id: number,
   name: string,
   email: string,
   body: string
}

const getData = <T extends FetchDataType[], R extends Promise<AxiosResponse<T, any>>>(url: string): R => {
   return axios.get<T>(url) as R
}

getData(`${Addresses.COMMENTS_URL}?_limit=100`)
   .then(data => {
      if (data.status === 200) {
         const converted_data = data.data.map(comment => ({ ID: comment.id, Email: comment.email }))
         console.log(converted_data)
      }
   })
   .catch(() => console.log('Ошибка сервера'))