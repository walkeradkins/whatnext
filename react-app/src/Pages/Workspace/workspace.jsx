import "./workspace.css";
import { useSelector, useDispatch } from "react-redux";
import { getAllWorkspaces } from "../../store/workspaces";
import { getAllLists } from "../../store/lists";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import whatnext_background from "../../Assets/Images/whatnext_background.jpg";

import { Sidebar, ListItem, WorkspaceHeader, AddList } from "../../Components";

const Workspace = ({ user }) => {
  const { workspaceId } = useParams();
  const dispatch = useDispatch();
  const workspaces = useSelector((state) => state.workspaces);
  const lists = useSelector((state) => state.lists);
  const listArary = Object.values(lists);
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    dispatch(getAllWorkspaces(user.id));
    dispatch(getAllLists(workspaceId));
  }, [dispatch, user.id, workspaceId]);

  if (!Object.keys(workspaces).length) return null;

  const workspace = workspaces[workspaceId];

  const handleToggle = () => {
    setShowAdd(true);
    console.log(showAdd);
  };

  return (
    <div
      className="workspace__wrapper"
      style={{ backgroundImage: `url(${whatnext_background})` }}
    >
      <div className="workspace__main">
        <Sidebar
          workspaces={Object.values(workspaces)}
          current={workspace}
          user={user}
        />
        <div className="workspace">
          <WorkspaceHeader workspace={workspace} />
          <div className="list__container">
            {listArary.map((list) => {
              return (
                <div key={list.id}>
                  <ListItem list={list} />
                </div>
              );
            })}
            {!showAdd && (
              <div className="workspace__list-add" onClick={handleToggle}>
                <span class="material-symbols-outlined">add</span>
                <p>Add another list</p>
              </div>
            )}
            {showAdd && (
              <AddList setShowAdd={setShowAdd} workspaceId={workspaceId}/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
