package jp.net.paypay.employee.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import jp.net.paypay.employee.entity.EmployeeComment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Mapper
@Repository
public interface CommentMapper extends BaseMapper<EmployeeComment> {


    @Select("select * from employee_comment where employee_id = #{id}")
    List<EmployeeComment> selectByEmployeeId(Long id);

    @Select("select count(*) from employee_comment where employee_id = #{id}")
    int countCommentByEmployeeId(Long id);

    @Select("select id from employee_comment where employee_id = #{id}")
    List<Long> selectIdsByEmployeeId(Long id);
}
