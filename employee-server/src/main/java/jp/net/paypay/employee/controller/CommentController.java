package jp.net.paypay.employee.controller;

import com.baomidou.mybatisplus.core.metadata.IPage;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import jp.net.paypay.employee.base.Result;
import jp.net.paypay.employee.entity.EmployeeComment;
import jp.net.paypay.employee.service.CommentService;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/comment")
@Api(tags = "comment manager")
@Slf4j
@RestController
@RequiredArgsConstructor
public class CommentController {

  private final CommentService commentService;

  @ApiOperation(value = "select list with page", httpMethod = "GET")
  @GetMapping("/")
  public Result<IPage<EmployeeComment>> listComment(
      @RequestParam(value = "start", defaultValue = "1") int start,
      @RequestParam(value = "pageSize", defaultValue = "10") int pageSize) {
    return commentService.listComment(start, pageSize);
  }

  @ApiOperation(value = "get a Comment detail", httpMethod = "GET")
  @GetMapping("/{id}")
  public Result<EmployeeComment> findCommentById(@PathVariable Long id) throws Exception {
    return commentService.findCommentById(id);
  }

  @ApiOperation(value = "add a Comment", httpMethod = "PUT")
  @PutMapping("/")
  public Result<Boolean> addComment(@RequestBody CommentRequest request) {
    return commentService.addComment(request);
  }

  @ApiOperation(value = "update a Comment", httpMethod = "POST")
  @PostMapping("/")
  public Result<Boolean> updateComment(@RequestBody CommentRequest request) throws Exception {
    return commentService.updateComment(request);
  }

  @ApiOperation(value = "delete a Comment detail", httpMethod = "DELETE")
  @DeleteMapping("/{id}")
  public Result<Boolean> deleteCommentById(@PathVariable Long id) throws Exception {
    return commentService.deleteCommentById(id);
  }

  @Data
  public static class CommentRequest {
    private Long id;

    private Long employeeId;

    private String comment;
  }
}
