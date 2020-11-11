package jp.net.paypay.employee.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import jp.net.paypay.employee.entity.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface EmployeeMapper extends BaseMapper<Employee> {

    
}
