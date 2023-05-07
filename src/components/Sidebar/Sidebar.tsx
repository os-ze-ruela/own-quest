import { useContext, useState } from "react";
import styled from "styled-components";
import { CreationContext } from "../../contexts/creation";

const SidebarContainer = styled.div<{ isCollapsed: boolean }>`
  position: fixed;
  top: 0;
  right: ${({ isCollapsed }) => (isCollapsed ? "-200px" : "0")};
  width: 200px;
  height: 100%;
  color: white;
  background-color: #202331;
  transition: right 0.3s ease;
`;

const Button = styled.button`
  position: absolute;
  top: 50%;
  left: -45px;
  width: 60px;
  height: 40px;
  color: white;
  background-color: #202331;
  border: none;
  border-radius: 25%;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3); */
  cursor: pointer;
`;

const Menu = styled.ul`
  /* margin-top: 80px; */
  padding-left: 20px;
  list-style: none;
`;

const MenuItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #393e57;
  }
`;

const SubMenu = styled.ul`
  margin-top: 8px;
  margin-left: 24px;
  padding-left: 0;
  list-style: none;
`;

const SubMenuItem = styled.li`
  padding: 8px;
  cursor: pointer;
  &:hover {
    background-color: #545b80;
  }
`;

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const { pages } = useContext(CreationContext)

  const handleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <SidebarContainer isCollapsed={isCollapsed}>
      <Button onClick={handleCollapse}>
        {isCollapsed ? "◀" : "▶"}
      </Button>
      <Menu>
        {
          pages.map((page, index) => (
            <MenuItem>
              📄Page {index + 1}
              <SubMenu>
                {
                  page.buttons.map((button, index) => (
                    <>
                      🔘Button {index + 1}
                      <SubMenu>
                        <SubMenuItem>
                          ➡️Page {button.nextPageId}
                        </SubMenuItem>
                      </SubMenu>
                    </>
                  ))
                }
              </SubMenu>
            </MenuItem>
          )
          )
        }
        {/* <MenuItem>
        📄Page 1
        <SubMenu>
            <SubMenuItem>
                🔘Button 1
                <SubMenu>
                <SubMenuItem>➡️Page 2</SubMenuItem>
              </SubMenu>
            </SubMenuItem>
            <SubMenuItem>
                🔘Button 2
                <SubMenu>
                <SubMenuItem>➡️Page 3</SubMenuItem>
              </SubMenu>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>
        <MenuItem>
        📄Page 2
          <SubMenu>
            <SubMenuItem>🔘Button 1</SubMenuItem>
            <SubMenuItem>
                🔘Button 2
                <SubMenu>
                <SubMenuItem>➡️Page 1</SubMenuItem>
              </SubMenu>
            </SubMenuItem>
            <SubMenuItem>
                🔘Button 3
              <SubMenu>
                <SubMenuItem>➡️Page 3</SubMenuItem>
              </SubMenu>
            </SubMenuItem>
          </SubMenu>
        </MenuItem>
        <MenuItem>
        📄Page 3
          <SubMenu>
            <SubMenuItem>🔘Button 1</SubMenuItem>
          </SubMenu>
        </MenuItem> */}
      </Menu>
    </SidebarContainer>
  );
};

export default Sidebar;
