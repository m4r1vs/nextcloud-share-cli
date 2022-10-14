const fs = require("fs")
const path = require("path")

const read_file = (file_path, absolute) => {
    if (absolute) {
        file_path = path.join(__dirname, file_path)
    } else {
        file_path = path.join(process.cwd(), file_path)
    }
    const data = fs.readFileSync(file_path)
    return data
}

const read_auth = () => {
    let auth_data = read_file("auth.json", true)
    auth_data = auth_data.toString("utf-8")
    return JSON.parse(auth_data)
}

const create_auth_header = (username, password) => {
    const data = username + ":" + password
    const buff = new Buffer.from(data)
    return buff.toString("base64")
}

const get_file_name = path_to_file => {
    return path_to_file.split("/")[path_to_file.split("/").length - 1]
}

module.exports = {
    read_file,
    read_auth,
    create_auth_header,
    get_file_name
}