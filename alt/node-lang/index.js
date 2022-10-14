const process = require("process")
const misc = require("./misc.js")
const NextcloudClass = require("./uploader.js").default

global.ROOT = "cloud.mafiasi.de"
global.WEBDEV_ENDPOINT = "/remote.php/dav"

const cli_args = process.argv


const upload_file = path_to_file => {

  console.log("Uploading " + path_to_file)

  const auth_data = misc.read_auth()
  const username = auth_data.username
  const password = auth_data.password

  const Nextcloud = new NextcloudClass(username, password)
  Nextcloud.upload(path_to_file)
}

const share_file = path_to_file => {

  console.log("Uploading " + path_to_file)

  const auth_data = misc.read_auth()
  const username = auth_data.username
  const password = auth_data.password

  const Nextcloud = new NextcloudClass(username, password)
  Nextcloud.upload(path_to_file)
}

cli_args.forEach((arg, index) => {

  let uploaded_path = ""

  switch(arg) {
    case "--upload":
    case "-U":
      uploaded_path = upload_file(cli_args[index + 1])
      console.log(uploaded_path)
    case "--share":
    case "-S":
      uploaded_path = upload_file(cli_args[index + 1])
      share_file()
  }

})

