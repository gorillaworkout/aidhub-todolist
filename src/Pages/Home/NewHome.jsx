import React, { useEffect, useState } from "react";
import "./home.css";
import logo from "./../../Assets/gorillalogo.png";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { GrAddCircle } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import SideHeader from "../../Components/SideHeader/SideHeader";
import Header from "../../Components/SideHeader/Header";
import ProgressBar from "react-bootstrap/ProgressBar";
import {
  AiFillCheckCircle,
  AiOutlineEdit,
  AiOutlineDelete,
} from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Button as ButtonSemantic, Popup, Grid } from "semantic-ui-react";
import TaskName from "../../Components/TaskName";
import { FullPageLoading } from "../../Components/Loading/Loading";
import TaskDataService from "../../Services/task.services";
import {GetAllProduct} from '../../Redux/Actions/ProductActions'

export default function App() {
  const dispatch = useDispatch();
  const Product = useSelector((state) => state.Product);
  console.log(Product, "product");
  const [nameTask, setNameTask] = useState("");
  const [statusAdd, setStatusAdd] = useState(false);
  const [allData, setAllData] = useState(Product.allProduct);
  const [modalTambah, setModalTambah] = useState(false);
  const [editTask, setEditTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [editNameTask, setEditNameTask] = useState("");
  const [editProgress, setEditProgress] = useState("");
  const [indexEdit, setIndexEdit] = useState(0);
  const [indexDelete, setIndexDelete] = useState(0);
  const [loadingFetch, setLoadingFetch] = useState(true);
  const [description, setDescription] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  useEffect(() => {
    setAllData(Product.allProduct);
  }, [Product]);

  useEffect(() => {
    if (Product.isLoadingProduct === !true) {
      setAllData(Product.allProduct);
      setLoadingFetch(false);
    }
  }, [
    Product.allData,
    Product.allProduct,
    Product.isLoadingProduct,
    allData,
    loadingFetch,
  ]);
  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    var updatedList = Product.allProduct;
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    // setAllData(...updatedList);
  };

  const toggle = () => setModalTambah(false);
  const toggleEdit = () => setEditTask(false);
  const toggleDelete = () => setDeleteTask(false);

  // edit task
  const editTaskFunc = (id, index, val) => {
    console.log(val,' val edit')
    setIndexEdit(index);
    setEditTask(true);
    setEditNameTask(val.title);
    setEditProgress(val.status);
    setEditDescription(val.description);
    console.log(val.id,' val id')
  };
  const deleteTaskFunc = (id, index) => {
    setIndexDelete(index);

    setDeleteTask(true);
  };
  const onDeleteEdit = async () => {
    console.log(indexDelete,' index edit')
    var dataToSaved = allData;
    var objIndex = allData.findIndex((obj) => obj.id === indexDelete);
    dataToSaved.splice(objIndex, 1);
    setAllData(dataToSaved);
    setDeleteTask(false);
    const deleteTask = await TaskDataService.deleteTask(indexDelete);
    dispatch(GetAllProduct())
    console.log(deleteTask,' delete task')
  };
  const onSaveEdit = async () => {
    var date = new Date();
    var time = date.toLocaleTimeString();
    var newDate = `${new Date().toISOString().split("T")[0]} ${time}`;
    const obj = {
      id: indexEdit,
      title: editNameTask,
      status: editProgress === "success" ? 1 : 0,
      description: editDescription,
      createdAt: newDate,
    };
    console.log(obj,' new obj')
    await TaskDataService.updateTask(indexEdit, obj);
    // dispatch({ type: "UPDATEPRODUCT", allProduct: dataToSaved });
    dispatch(GetAllProduct())

    setEditTask(false);
  };
  const onSave = async () => {
    // var dataToSaved = allData;
    var find_id = allData.length + 1;
    var date = new Date();
    var time = date.toLocaleTimeString();
    var newDate = `${new Date().toISOString().split("T")[0]} ${time}`;
    const obj = {
      id: find_id,
      title: nameTask,
      status: statusAdd === "success" ? 1 : 0,
      description: description,
      createdAt: newDate,
    };
    // dataToSaved.push(obj);
    console.log(obj,' obj')
    await TaskDataService.addTask(obj);
    console.log(obj);
    dispatch(GetAllProduct())
    setModalTambah(false);
  };

  if (loadingFetch) {
    // console.log('masih stuck di app page baru jalan')
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh", width: "100vw" }}
      >
        {FullPageLoading(loadingFetch, 100, "#0095DA")}
      </div>
    );
  }

  return (
    <>
      {/* DELETE TASK */}
      <Modal isOpen={deleteTask} toggle={toggleDelete} id="modal-box-delete">
        <ModalHeader toggle={toggleDelete} id="delete-task">
          <RiErrorWarningLine id="icon-warning" />
          <p>Delete Task</p>
        </ModalHeader>
        <ModalBody id="delete-body">
          <p>Are you sure want to delete this task?</p>
        </ModalBody>
        <ModalFooter id="footer-delete">
          <Button color="primary" onClick={toggleDelete}>
            Cancel
          </Button>
          <Button color="primary" onClick={onDeleteEdit}>
            Delete Task
          </Button>
        </ModalFooter>
      </Modal>
      {/* DELETE TASK END */}

      {/* EDIT TASK */}
      <Modal isOpen={editTask} toggle={toggleEdit} id="modal-box">
        <ModalHeader toggle={toggleEdit} id="create-task">
          <p>Edit Task</p>
        </ModalHeader>
        <ModalBody>
          <TaskName
            arr={{
              taskName: "Task Name",
              typeInput: "text",
              onClick: (e) => setEditNameTask(e.target.value),
              placeholder: "Example: Build Your Own Brain",
              className: "input-modal-task",
              defaultValue: editNameTask,
            }}
          />
          <TaskName
            arr={{
              taskName: "Description",
              typeInput: "text",
              onClick: (e) => setEditDescription(e.target.value),
              placeholder: "Example: Build Your Own Brain",
              className: "input-modal-task",
              defaultValue: editDescription,
            }}
          />
          <p>Status</p>
          <select id="status" onChange={(e) => setEditProgress(e.target.value)}>
            <option value="onprogress">On Progress</option>
            <option value="success">Success</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleEdit}>
            Cancel
          </Button>
          <Button color="primary" onClick={onSaveEdit}>
            Save Task
          </Button>
        </ModalFooter>
      </Modal>
      {/* EDIT TASK END*/}

      {/* TAMBAH TASK */}
      <Modal isOpen={modalTambah} toggle={toggle} id="modal-box">
        <ModalHeader toggle={toggle} id="create-task">
          <p>Create Task</p>
        </ModalHeader>
        <ModalBody>
          <TaskName
            arr={{
              taskName: "Task Name",
              typeInput: "text",
              onClick: (e) => setNameTask(e.target.value),
              placeholder: "Example: Build rocket to mars",
              className: "input-modal-task",
            }}
          />
          <TaskName
            arr={{
              taskName: "Description",
              typeInput: "text",
              onClick: (e) => setDescription(e.target.value),
              placeholder: "Example: Build Your Own BRAIN",
              className: "input-modal-task",
            }}
          />
          <p>Status</p>
          <select id="status" onChange={(e) => setStatusAdd(e.target.value)}>
            <option value="onprogress">On Progress</option>
            <option value="success">Success</option>
          </select>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Cancel
          </Button>
          <Button color="primary" onClick={onSave}>
            Save Task
          </Button>
        </ModalFooter>
      </Modal>
      {/* TAMBAH TASK END */}
      <div className="box-home">
        <SideHeader arr={{ img: logo }} />
        <div className="home-main">
          <Header arr={{ judul: "TASK ROADMAP" }} />
          <div className="main-2">
            <div className="task-1">
              <div className="task-name">
                <p id="name-1">Group Task 1</p>
              </div>
              <p id="name-2">Status</p>
              {/* render */}
              <div className="main-filter">
                <p>Total Task :</p>
                <div>
                  <div>
                    <p>Total:{Product.allProduct.length}</p>
                  </div>
                  <div>
                    <p>Completed:{Product.allOnSuccess.length}</p>
                  </div>
                  <div>
                    <p>On Going:{Product.allOnProgress.length}</p>
                  </div>
                </div>
              </div>
              <div className="main-filter">
                <p>Filter by :</p>
                <select
                  id="status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="completed">Completed</option>
                  <option value="ongoing">on Going</option>
                </select>
              </div>
          
              <div className="main-3" onClick={() => setModalTambah(true)}>
                <GrAddCircle id="icon-2" />
                <p id="new-task">New Task</p>
              </div>
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable droppableId="list-container">
                  {(provided) => (
                    <div
                      className="list-container"
                      {...provided.draggableProps}
                      ref={provided.innerRef}
                    >
                      {statusFilter === "all"
                        ? Product?.allProduct?.map((val, index) => {
                            return (
                              <Draggable
                                key={val.id}
                                draggableId={val.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    key={index + 1}
                                    className="main-task"
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  >
                                    <p id="name-item">{val.title}</p>
                                    <div className="task-option">
                                      <div className="option-left">
                                        <div className="prog-bar">
                                          {val.status === 1 ? (
                                            <>
                                              <ProgressBar
                                                now={100}
                                                variant="success"
                                              />
                                              <AiFillCheckCircle id="icon" />
                                            </>
                                          ) : (
                                            <>
                                              <ProgressBar now={val.status} />
                                              <p>{val.status}%</p>
                                            </>
                                          )}
                                        </div>
                                      </div>

                                      <Popup
                                        trigger={
                                          <ButtonSemantic>
                                            <BsThreeDots id="icon-2" />
                                          </ButtonSemantic>
                                        }
                                        flowing
                                        hoverable
                                      >
                                        <Grid
                                          centered
                                          divided
                                          columns={1}
                                          className="grid-modal"
                                        >
                                          <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                              <AiOutlineEdit className="icon-mod" />
                                            </div>
                                            <div
                                              className="row-mod-2"
                                              onClick={() =>
                                                editTaskFunc(2, val.id, val)
                                              }
                                            >
                                              <p>Edit</p>
                                            </div>
                                          </Grid.Row>
                                          <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                              <AiOutlineDelete className="icon-mod" />
                                            </div>
                                            <div
                                              className="row-mod-2"
                                              onClick={() =>
                                                deleteTaskFunc(2, val.id)
                                              }
                                            >
                                              <p>Delete</p>
                                            </div>
                                          </Grid.Row>
                                        </Grid>
                                      </Popup>
                                    </div>
                                    <p>{val.description}</p>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })
                        : statusFilter === "completed"
                        ? Product?.allOnSuccess?.map((val, index) => {
                            return (
                              <Draggable
                                key={val.id}
                                draggableId={val.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    key={index + 1}
                                    className="main-task"
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  >
                                    <p id="name-item">{val.title}</p>
                                    <div className="task-option">
                                      <div className="option-left">
                                        <div className="prog-bar">
                                          <ProgressBar
                                            now={100}
                                            variant="success"
                                          />
                                          <AiFillCheckCircle id="icon" />
                                        </div>
                                      </div>

                                      <Popup
                                        trigger={
                                          <ButtonSemantic>
                                            <BsThreeDots id="icon-2" />
                                          </ButtonSemantic>
                                        }
                                        flowing
                                        hoverable
                                      >
                                        <Grid
                                          centered
                                          divided
                                          columns={1}
                                          className="grid-modal"
                                        >
                                          <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                              <AiOutlineEdit className="icon-mod" />
                                            </div>
                                            <div
                                              className="row-mod-2"
                                              onClick={() =>
                                                editTaskFunc(2, val.id, val)
                                              }
                                            >
                                              <p>Edit</p>
                                            </div>
                                          </Grid.Row>
                                          <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                              <AiOutlineDelete className="icon-mod" />
                                            </div>
                                            <div
                                              className="row-mod-2"
                                              onClick={() =>
                                                deleteTaskFunc(2, val.id)
                                              }
                                            >
                                              <p>Delete</p>
                                            </div>
                                          </Grid.Row>
                                        </Grid>
                                      </Popup>
                                    </div>
                                    <p>{val.description}</p>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })
                        : Product?.allOnProgress?.map((val, index) => {
                            return (
                              <Draggable
                                key={val.id}
                                draggableId={val.id.toString()}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    key={index + 1}
                                    className="main-task"
                                    ref={provided.innerRef}
                                    {...provided.dragHandleProps}
                                    {...provided.draggableProps}
                                  >
                                    <p id="name-item">{val.title}</p>
                                    <div className="task-option">
                                      <div className="option-left">
                                        <div className="prog-bar">
                                          <ProgressBar now={val.status} />
                                          <p>{val.status}%</p>
                                        </div>
                                      </div>

                                      <Popup
                                        trigger={
                                          <ButtonSemantic>
                                            <BsThreeDots id="icon-2" />
                                          </ButtonSemantic>
                                        }
                                        flowing
                                        hoverable
                                      >
                                        <Grid
                                          centered
                                          divided
                                          columns={1}
                                          className="grid-modal"
                                        >
                                          <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                              <AiOutlineEdit className="icon-mod" />
                                            </div>
                                            <div
                                              className="row-mod-2"
                                              onClick={() =>
                                                editTaskFunc(2, val.id, val)
                                              }
                                            >
                                              <p>Edit</p>
                                            </div>
                                          </Grid.Row>
                                          <Grid.Row className="grid-row-mod">
                                            <div className="row-mod-1">
                                              <AiOutlineDelete className="icon-mod" />
                                            </div>
                                            <div
                                              className="row-mod-2"
                                              onClick={() =>
                                                deleteTaskFunc(2, val.id)
                                              }
                                            >
                                              <p>Delete</p>
                                            </div>
                                          </Grid.Row>
                                        </Grid>
                                      </Popup>
                                    </div>
                                    <p>{val.description}</p>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
              {/* render */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
