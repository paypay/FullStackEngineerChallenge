package jp.net.paypay.employee.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.controller.EmployeeController;
import jp.net.paypay.employee.entity.Employee;
import jp.net.paypay.employee.mapper.EmployeeMapper;
import jp.net.paypay.employee.service.EmployeeService;
import jp.net.paypay.employee.util.IDUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeMapper employeeMapper;

  @Override
  public Result<IPage<Employee>> listEmployee(int start, int pageSize) {
    Page<Employee> page = new Page<>(start, pageSize);
    IPage<Employee> pageInfo = employeeMapper.selectPage(page, null);
    return Result.result(pageInfo);
  }

  @Override
  public Result<Boolean> addEmploy(EmployeeController.EmployeeRequest request) {

    Employee employee = new Employee();
    BeanUtils.copyProperties(request, employee);
    employee.setId(IDUtil.getId());
    int result = employeeMapper.insert(employee);
    return Result.result(result > 0);
  }

  @Override
  public Result<Employee> findEmployeeById(Long id) throws Exception {
    Employee existEmployee = employeeMapper.selectById(id);
    if (existEmployee == null) {
      throw new Exception("employee " + id + " not found");
    }

    return Result.result(existEmployee);
  }

  @Override
  public Result<Boolean> deleteEmployeeById(Long id) throws Exception {

    Employee existEmployee = employeeMapper.selectById(id);
    if (existEmployee == null) {
      throw new Exception("employee " + id + " not found");
    }
    int deleted = employeeMapper.deleteById(id);
    return Result.result(deleted > 0);
  }

  @Override
  public Result<Boolean> updateEmployee(EmployeeController.EmployeeRequest request)
      throws Exception {
    Employee existEmployee = employeeMapper.selectById(request.getId());

    if (existEmployee == null) {
      throw new Exception("employee " + request.getId() + " not found");
    }
    Employee employee = new Employee();
    BeanUtils.copyProperties(request, employee);
    int updated = employeeMapper.updateById(employee);

    return Result.result(updated > 0);
  }
}
