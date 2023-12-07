const express = require('express')
const cors = require('cors')
const {createMessage} = require('./controller')

const app = express()

app.use(express.json())
app.use(cors())

////ENDPOINTS  ////
app.post('/api/messages', createMessage)


///LISTEN   ///
app.listen(4004, () => console.log('4004 in da neighborhood'))
