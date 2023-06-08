const AvatarPicture = ({ picture, name, containerWidth, containerHeight }) => {

    return(
        picture ? (
          <div className={`w-${containerWidth} h-${containerHeight}`}>
            <img
              src={picture ? picture : ""}
              width="36"
              height="36"
              className="rounded-full"
              alt=""
            />
          </div>
          ) : (
            <div className={`bg-gray-200 rounded-full flex items-center justify-center w-${containerWidth} h-${containerHeight}`}>
              <span className="text-gray-600 font-bold text-xs">
              {name && name.split(" ").length > 1
                  ? `${name.substr(0, 1)}${name
                      .substr(name.indexOf(" ") + 1, 1)
                      .toUpperCase()}`
                  : name && name.substr(0, 1).toUpperCase()}
              </span>
            </div>
          )
    )

}

export default AvatarPicture;