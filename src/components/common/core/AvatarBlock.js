import { Avatar, Tooltip } from "antd";

const AvatarBlock = ({ users_list, maxCount }) => {
  const colors = [
    "red",
    "#f56a00",
    "#87d068",
    "fffed2",
    "blue",
    "orange",
    "chocolate",
  ];
  return (
    <Avatar.Group
      maxCount={maxCount || 2}
      size="large"
      maxStyle={{
        color: "#f56a00",
        backgroundColor: "#fde3cf",
      }}
    >
      {users_list &&
        users_list.map((item, index) => {
          return (
            <Tooltip title={item} placement="top" key={index}>
              <Avatar
                style={{
                  backgroundColor:
                    item !== "Anonymous" ? colors[index] : "gray",
                  cursor: "pointer",
                }}
              >
                {item
                  .split(" ")
                  [item.split(" ").length - 1].charAt(0)
                  .toUpperCase()}
              </Avatar>
            </Tooltip>
          );
        })}
    </Avatar.Group>
  );
};
export default AvatarBlock;
