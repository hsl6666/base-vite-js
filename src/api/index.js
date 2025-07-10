import request from "../utils/request/service";

class $Test {
  constructor() {}
  // 获取用户信息
  getTestInfo = () =>
    request({ url: `/api/one`, method: "get" });
  // 修改用户信息
  putTestInfo = (data) =>
    request({
      url: `/api/Testcenter/TestcenterSysTest/${data.id}`,
      data,
      method: "PUT",
    });
  // 申请服务商
  applyService = (data) =>
    request({
      url: `/api/Testcenter/TestcenterSysTenant/createOrUpdate`,
      data,
      method: "POST",
    }); //  移除团队成员
  delTeamNumber = (data) =>
    request({
      url: `/Testcenter/TestcenterTenantTestRelation/removeTestRelationController?TestId=${data.TestId}`,
      method: "DELETE",
    });
}

export default new $Test();
