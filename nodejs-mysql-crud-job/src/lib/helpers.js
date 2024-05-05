const bcrypt = require('bcryptjs');

const helpers = {
    async encryptPassword(password){
        const salt = await bcrypt.genSaltSync(10);
        return await bcrypt.hashSync(password, salt);
    },
    async matchPassword(password, hash){
        try{
            return await bcrypt.compare(password, hash);
        }catch (e) {
            console.log(e);
        }
    }
}

module.exports = helpers;