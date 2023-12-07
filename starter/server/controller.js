const bcrypt = require('bcryptjs') //in the file where the functionality is required
const chats = []


module.exports = {
    createMessage: (req, res) =>{
        const {pin, message} = req.body

        for(i = 0; i < chats.length; i++){
            let existingPin = bcrypt.compareSync(pin, chats[i].pinHash)

            if(existingPin){
                chats[i].messages.push(message)
                let messagesToReturn = {...chats[i]}
                delete messagesToReturn.pinHash
                return res.status(200).send(messagesToReturn)
            }
        }

        console.log(req.body)
        const salt = bcrypt.genSaltSync(5)
        const pinHash = bcrypt.hashSync(pin, salt)

        const msgObj = {
            pinHash,
            messages: [message],

        }
        chats.push(msgObj)
        let messagesToReturn = {...msgObj}
        delete messagesToReturn.pinHash
        res.status(200).send(messagesToReturn)
    },
}
