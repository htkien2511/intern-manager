import IconEye from "assets/icons/TTM_Icon-Eye.svg";
// import IconLocked from "assets/icons/TTM_Icon-Locked.svg";
import IconEdit from "assets/icons/TTM_Icon-Edit.svg";
import IconDelete from "assets/icons/TTM_Icon-RubbishDelete.svg";
// import IconClipboard from "assets/icons/TTM_Icon-Clipboard.svg";
export const taskListData = [
  {
    id: 1,
    nameProject: "Abc",
    listNameTask: [
      {
        task: "Cv1",
        taskDetails: [
          {
            id: "content_c11",
            value:
              "Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1 Content 1",
          },
        ],
        checked: true,
      },
      {
        task: "Cv2",
        taskDetails: [{ id: "content_c21", value: "Content 1" }],
        checked: false,
      },
    ],
    startDate: "22/12/2020",
    endDate: "28/12/2020",
  },
];

export const testPlan = [
  {
    taskId: "A",
    title: { value: "Create ForgotPassword Page", progress: 60 },
    createDate: "28/07/2020",
    dueDate: "28/07/2020",
    description: "Implement function : create, get all, update, delete project",
    usersAssignee: "Phan Trong Duc",
    difficulty: "Hard",
    isDone: false,
    point: 7.0,
  },
];

export const iconsAction = [
  { name: IconEye, color: "blue", action: "See", title: "See details" },
  { name: IconEdit, color: "green", action: "Edit", title: "Edit task" },
  { name: IconDelete, color: "red", action: "Delete", title: "Delete task" },
];
