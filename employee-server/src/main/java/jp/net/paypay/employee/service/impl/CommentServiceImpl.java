package jp.net.paypay.employee.service.impl;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.controller.CommentController;
import jp.net.paypay.employee.entity.EmployeeComment;
import jp.net.paypay.employee.mapper.CommentMapper;
import jp.net.paypay.employee.service.CommentService;
import jp.net.paypay.employee.util.IDUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

  private final CommentMapper commentMapper;

  @Override
  public Result<IPage<EmployeeComment>> listComment(int start, int pageSize) {
    Page<EmployeeComment> page = new Page<>(start, pageSize);
    IPage<EmployeeComment> pageInfo = commentMapper.selectPage(page, null);
    return Result.result(pageInfo);
  }

  @Override
  public Result<Boolean> addComment(CommentController.CommentRequest request) {

    EmployeeComment EmployeeComment = new EmployeeComment();
    BeanUtils.copyProperties(request, EmployeeComment);
    EmployeeComment.setId(IDUtil.getId());
    int result = commentMapper.insert(EmployeeComment);
    return Result.result(result > 0);
  }

  @Override
  public Result<EmployeeComment> findCommentById(Long id) throws Exception {
    EmployeeComment existEmployeeComment = commentMapper.selectById(id);
    if (existEmployeeComment == null) {
      throw new Exception("Comment " + id + " not found");
    }

    return Result.result(existEmployeeComment);
  }

  @Override
  public Result<Boolean> deleteCommentById(Long id) throws Exception {

    EmployeeComment existEmployeeComment = commentMapper.selectById(id);
    if (existEmployeeComment == null) {
      throw new Exception("Comment " + id + " not found");
    }
    int deleted = commentMapper.deleteById(id);
    return Result.result(deleted > 0);
  }

  @Override
  public Result<Boolean> updateComment(CommentController.CommentRequest request)
      throws Exception {
    EmployeeComment existEmployeeComment = commentMapper.selectById(request.getId());

    if (existEmployeeComment == null) {
      throw new Exception("Comment " + request.getId() + " not found");
    }
    existEmployeeComment.setComment(request.getComment());
    int updated = commentMapper.updateById(existEmployeeComment);

    return Result.result(updated > 0);
  }
}
