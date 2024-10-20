export const fetchQrCode=(url: string) => {
  
  return fetch("https/api.qrserver.com/v1/create-qr-code",{
    method:"GET",
    headers:{
      data: url,
      format:"svg"
    }
  }).then(response => {
    console.log(response);
    
    return response.text()
})
}