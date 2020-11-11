package jp.net.paypay.employee.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import jp.net.paypay.employee.entity.EmployeeComment;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Mapper
@Repository
public interface CommentMapper extends BaseMapper<EmployeeComment> {

    
}
