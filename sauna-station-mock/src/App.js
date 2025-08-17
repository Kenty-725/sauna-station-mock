import React, { useState } from "react";
import { ManagerLayout, AdminLayout } from "./components/Layouts";
import {
  UserTopPage,
  UserFacilityListPage,
  UserFacilityDetailPage,
  UserMyPage,
} from "./pages/UserPages";
import {
  ManagerLoginPage,
  ManagerDashboardPage,
  ManagerBookingListPage,
  ManagerFacilityEditPage,
  ManagerBookingSlotManagePage,
  ManagerBusinessHoursManagePage,
  ManagerStaffManagePage,
} from "./pages/ManagerPages";
import {
  AdminLoginPage,
  AdminCompanyListPage,
  AdminAccountManagePage,
} from "./pages/AdminPages";
import AuthApp from "./auth/AuthApp";

// メインアプリケーションコンポーネント
const App = () => {
  // 現在表示しているページを管理するステート
  const [currentPage, setCurrentPage] = useState("userTop");
  // 認証状態を管理するステート
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState("general");
  const [userData, setUserData] = useState(null);

  // ページ遷移関数
  const navigateTo = (pageName) => {
    setCurrentPage(pageName);
    window.scrollTo(0, 0);
  };

  // 認証成功時のハンドラ
  const handleAuthSuccess = (authData) => {
    setIsAuthenticated(true);
    setUserType(authData.userType);
    setUserData(authData);

    // ユーザータイプに応じて適切なページに遷移
    if (authData.userType === "manager") {
      navigateTo("managerDashboard");
    } else if (authData.userType === "admin") {
      navigateTo("adminCompanyList");
    } else {
      navigateTo("userTop");
    }
  };

  // ログアウト処理
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType("general");
    setUserData(null);
    navigateTo("userTop");
  };

  // 現在のページに応じてレンダリング
  const renderPage = () => {
    switch (currentPage) {
      // 一般ユーザー向けページ
      case "userTop":
        return (
          <UserTopPage
            navigateTo={navigateTo}
            isAuthenticated={isAuthenticated}
            userData={userData}
            onLogout={handleLogout}
          />
        );
      case "userFacilityList":
        return (
          <UserFacilityListPage
            navigateTo={navigateTo}
            isAuthenticated={isAuthenticated}
            userData={userData}
            onLogout={handleLogout}
          />
        );
      case "userFacilityDetail":
        return (
          <UserFacilityDetailPage
            navigateTo={navigateTo}
            isAuthenticated={isAuthenticated}
            userData={userData}
            onLogout={handleLogout}
          />
        );
      case "userMyPage":
        return (
          <UserMyPage
            navigateTo={navigateTo}
            isAuthenticated={isAuthenticated}
            userData={userData}
            onLogout={handleLogout}
          />
        );
      case "userLogin":
        return <AuthApp onAuthSuccess={handleAuthSuccess} userType="general" />;

      // 施設担当者向けページ
      case "managerLogin":
        return <ManagerLoginPage navigateTo={navigateTo} />;
      case "managerDashboard":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerDashboardPage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerBookingList":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerBookingListPage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerBookingSlotManage":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerBookingSlotManagePage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerBusinessHoursManage":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerBusinessHoursManagePage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerFacilityEdit":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerFacilityEditPage navigateTo={navigateTo} />
          </ManagerLayout>
        );
      case "managerStaffManage":
        return (
          <ManagerLayout navigateTo={navigateTo} currentPage={currentPage}>
            <ManagerStaffManagePage navigateTo={navigateTo} />
          </ManagerLayout>
        );

      // システム管理者向けページ
      case "adminLogin":
        return <AdminLoginPage navigateTo={navigateTo} />;
      case "adminCompanyList":
        return (
          <AdminLayout navigateTo={navigateTo} currentPage={currentPage}>
            <AdminCompanyListPage navigateTo={navigateTo} />
          </AdminLayout>
        );
      case "adminAccountManage":
        return (
          <AdminLayout navigateTo={navigateTo} currentPage={currentPage}>
            <AdminAccountManagePage navigateTo={navigateTo} />
          </AdminLayout>
        );

      default:
        return <UserTopPage navigateTo={navigateTo} />;
    }
  };

  return <>{renderPage()}</>;
};

export default App;
