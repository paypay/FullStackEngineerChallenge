package jp.net.paypay.employee.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.entity.Employee;
import jp.net.paypay.employee.entity.EmployeeComment;
import jp.net.paypay.employee.service.EmployeeService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/employee")
@Api(tags = "employ manager")
@Slf4j
@RestController
@RequiredArgsConstructor
public class EmployeeController {

  private final EmployeeService employeeService;

  @ApiOperation(value = "select list with page", httpMethod = "GET")
  @GetMapping("/")
  public Result<IPage<Employee>> listEmployee(
      @RequestParam(value = "page", defaultValue = "1") int start,
      @RequestParam(value = "limit", defaultValue = "10") int pageSize) {
    return employeeService.listEmployee(start, pageSize);
  }

  @ApiOperation(value = "get a employee detail", httpMethod = "GET")
  @GetMapping("/{id}")
  public Result<Employee> findEmployeeById(@PathVariable Long id) throws Exception {
    return employeeService.findEmployeeById(id);
  }

  @ApiOperation(value = "add a employee", httpMethod = "PUT")
  @PutMapping("/")
  public Result<Boolean> addEmployee(@RequestBody EmployeeRequest request) {
    return employeeService.addEmploy(request);
  }

  @ApiOperation(value = "update a employee", httpMethod = "POST")
  @PostMapping("/{id}")
  public Result<Boolean> updateEmployee(@PathVariable Long id, @RequestBody EmployeeRequest request)
      throws Exception {
    return employeeService.updateEmployee(id, request);
  }

  @ApiOperation(value = "delete a employee detail", httpMethod = "DELETE")
  @DeleteMapping("/{id}")
  public Result<Boolean> deleteEmployeeById(@PathVariable Long id) throws Exception {
    return employeeService.deleteEmployeeById(id);
  }

  @ApiOperation(value = "comment Employee", httpMethod = "PUT")
  @PutMapping("/comment/{id}")
  public Result<Boolean> commentEmployee(
      @PathVariable Long id, @RequestBody EmployeeComment comment) throws Exception {
    return employeeService.commentEmployee(id, comment);
  }


  @ApiOperation(value = "GET Employee comment", httpMethod = "GET")
  @GetMapping("/comment/{id}")
  public Result<List<EmployeeComment>> findCommentsByEmployeeId(
          @PathVariable Long id) throws Exception {
    return employeeService.findCommentsByEmployeeId(id);
  }

  @Data
  public static class EmployeeRequest {
    private String name;
  }
}
