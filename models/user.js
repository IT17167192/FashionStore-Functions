

//virtual field
userSchema.virtual('password')
.set(function (password) {
    this._password = password;
    this.salt = uuidv1();
    this.hash_password = this.encryptPassword(password);
})
.get(function () {
    return this._password;
});

userSchema.methods = {
    auth: function(password){
        return this.encryptPassword(password) === this.hash_password;
    },
    encryptPassword : function (password) {
        if(!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }catch(err){
            return "";
        }
    }
};

