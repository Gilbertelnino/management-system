const User = {
    validToken: {
       'auth-token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImVtYWlsIjoibmRhdGlnaWxiZXJ0QGdtYWlsLmNvbSIsImlkIjoiMjciLCJuYW1lIjoiSm9obiBzbWl0aCIsInBhc3N3b3JkIjoiJDJhJDEwJExEZHJUeXR5TURzQ3FocTY0M0VhUy5Obmd6cTI1a3lqUUd6NGJIU01HMWhBUmNBT3hvRlYuIiwiaXNWZXJpZmllZCI6dHJ1ZX0sImlhdCI6MTYwMzM4MDg5NSwiZXhwIjoxNjAzMzg0NDk1fQ.2Z1tY40lj3tNkfQiN934XQ5l24MbxEaDuLlHvMhrhxY'
   },
   noTokenProvided: {
    "auth-token": "",
  },
   invalidToken: {
    "auth-token": "112",
  },
  validLoginUser: {
    email: 'gilbeltelnino@gmail.com',
    password: '1234567'
   }
}

export default User;