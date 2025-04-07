import axiosInstance from "@/lib/axios";

export const createPost = async (data: {
    community: string,
    title: string,
    content: string
})=> {
      const response = axiosInstance.post('/posts', data)
      return response;
}

export const getAllPosts = async () => {
  const response = axiosInstance.get('/posts')
  return response;
}

export const updatePost = async (id:string) => {
  const response = axiosInstance.patch(`/post/${id}`)
  return response;
}

export const getPost = async (id:string) => {
  const response = axiosInstance.get(`/post/${id}`)
  return response;
}