const misc = require("./misc.js")
const https = require("https")

module.exports.default = class Nextcloud {

    constructor(username, password) {
        this.username = username
        this.password = password
    }

    upload(path_to_file) {
        const req_data = misc.read_file(path_to_file, false)

        const upload_put_options = {
            hostname: global.ROOT,
            port: 443,
            path: global.WEBDEV_ENDPOINT + "/files/" + this.username + "/CLI-Upload/" + misc.get_file_name(path_to_file),
            method: "PUT",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Content-Length": req_data.length,
                "Authorization": "Basic " + misc.create_auth_header(this.username, this.password)
            }
        }
        
        const req = https.request(upload_put_options, res => {
            res.setEncoding("utf-8")
            res.on("data", res_data => {
            console.log("Response: ", res_data)
                console.log("Response from Nextcloud: ", res_data)
            })
        })

        req.write(req_data)
        req.end()

        return "/CLI-Upload/" + misc.get_file_name(path_to_file)
    }
}