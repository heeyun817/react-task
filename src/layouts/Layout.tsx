import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <main>
        <Outlet /> {/* 자식 라우트가 여기에 렌더링됨 */}
      </main>
    </>
  );
}

export default Layout;
