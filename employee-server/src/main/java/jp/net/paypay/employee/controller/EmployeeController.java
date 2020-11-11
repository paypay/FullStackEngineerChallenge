package jp.net.paypay.employee.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.entity.Employee;
import jp.net.paypay.employee.service.EmployeeService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

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
      @RequestParam(value = "start", defaultValue = "1") int start,
      @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
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
  @PostMapping("/")
  public Result<Boolean> updateEmployee(@RequestBody EmployeeRequest request) throws Exception {
    return employeeService.updateEmployee(request);
  }

  @ApiOperation(value = "delete a employee detail", httpMethod = "DELETE")
  @DeleteMapping("/{id}")
  public Result<Boolean> deleteEmployeeById(@PathVariable Long id) throws Exception {
    return employeeService.deleteEmployeeById(id);
  }

  @Data
  public static class EmployeeRequest {
    private Long id;

    private String name;
  }
}
