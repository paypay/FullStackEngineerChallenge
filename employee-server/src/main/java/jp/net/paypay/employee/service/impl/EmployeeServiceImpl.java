package jp.net.paypay.employee.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.controller.EmployeeController;
import jp.net.paypay.employee.entity.Employee;
import jp.net.paypay.employee.entity.EmployeeComment;
import jp.net.paypay.employee.mapper.CommentMapper;
import jp.net.paypay.employee.mapper.EmployeeMapper;
import jp.net.paypay.employee.service.EmployeeService;
import jp.net.paypay.employee.util.IDUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EmployeeServiceImpl implements EmployeeService {

  private final EmployeeMapper employeeMapper;
  private final CommentMapper commentMapper;

  @Override
  public Result<IPage<Employee>> listEmployee(int start, int pageSize) {
    Page<Employee> page = new Page<>(start, pageSize);
    IPage<Employee> pageInfo = employeeMapper.selectPage(page, null);
    for (Employee record : pageInfo.getRecords()) {
      int size = commentMapper.countCommentByEmployeeId(record.getId());
      record.setCommentCount(size);
    }
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

    // delete the employee comments on employee deleted.  avoid the dirty data
    List<Long> commentIds = commentMapper.selectIdsByEmployeeId(id);
    employeeMapper.deleteBatchIds(commentIds);

    return Result.result(deleted > 0);
  }

  @Override
  public Result<Boolean> updateEmployee(Long id, EmployeeController.EmployeeRequest request)
      throws Exception {
    Employee existEmployee = employeeMapper.selectById(id);

    if (existEmployee == null) {
      throw new Exception("employee " + id + " not found");
    }
    Employee employee = new Employee();
    BeanUtils.copyProperties(request, employee);
    employee.setId(id);
    int updated = employeeMapper.updateById(employee);

    return Result.result(updated > 0);
  }

  @Override
  public Result<Boolean> commentEmployee(Long id, EmployeeComment comment) throws Exception {
    Employee existEmployee = employeeMapper.selectById(id);

    if (existEmployee == null) {
      throw new Exception("employee " + id + " not found");
    }
    comment.setEmployeeId(id);
    comment.setId(IDUtil.getId());
    int ret = commentMapper.insert(comment);
    return Result.result(ret > 0);
  }

  @Override
  public Result<List<EmployeeComment>> findCommentsByEmployeeId(Long id) throws Exception {
    Employee existEmployee = employeeMapper.selectById(id);

    if (existEmployee == null) {
      throw new Exception("employee " + id + " not found");
    }
    List<EmployeeComment> comments = commentMapper.selectByEmployeeId(id);
    return Result.result(comments);
  }
}
