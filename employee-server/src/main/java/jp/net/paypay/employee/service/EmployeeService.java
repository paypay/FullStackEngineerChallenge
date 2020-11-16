package jp.net.paypay.employee.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.controller.EmployeeController;
import jp.net.paypay.employee.entity.Employee;
import jp.net.paypay.employee.entity.EmployeeComment;

import java.util.List;

public interface EmployeeService {
  Result<IPage<Employee>> listEmployee(int start, int page);

  Result<Boolean> addEmploy(EmployeeController.EmployeeRequest request);

  Result<Employee> findEmployeeById(Long id) throws Exception;

  Result<Boolean> deleteEmployeeById(Long id) throws Exception;

  Result<Boolean> updateEmployee(Long id,EmployeeController.EmployeeRequest request) throws Exception;

  Result<Boolean> commentEmployee(Long id, EmployeeComment comment) throws Exception;

  Result<List<EmployeeComment>> findCommentsByEmployeeId(Long id) throws Exception;
}
