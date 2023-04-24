

const AvatarPicture = ({ picture, name }) => {

    return(
        picture ? (
            <img
              src={picture}
              width="36"
              height="36"
              className="rounded-full"
              alt=""
            />
          ) : (
            <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center">
              <span className="text-gray-600 font-bold text-xs">
              {name.split(" ").length > 1
                  ? `${name.substr(0, 1)}${name
                      .substr(name.indexOf(" ") + 1, 1)
                      .toUpperCase()}`
                  : name.substr(0, 1).toUpperCase()}
              </span>
            </div>
          )
    )

}

export default AvatarPicture;