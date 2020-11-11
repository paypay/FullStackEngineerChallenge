package jp.net.paypay.employee.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.controller.CommentController;
import jp.net.paypay.employee.entity.EmployeeComment;

public interface CommentService {
  Result<IPage<EmployeeComment>> listComment(int start, int page);

  Result<Boolean> addComment(CommentController.CommentRequest request);

  Result<EmployeeComment> findCommentById(Long id) throws Exception;

  Result<Boolean> deleteCommentById(Long id) throws Exception;

  Result<Boolean> updateComment(CommentController.CommentRequest request) throws Exception;
}
