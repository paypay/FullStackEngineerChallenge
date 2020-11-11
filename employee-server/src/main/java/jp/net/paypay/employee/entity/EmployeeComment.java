package jp.net.paypay.employee.entity;

import jp.net.paypay.employee.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class EmployeeComment extends BaseEntity {

    private Long employeeId;

    private String comment;




}
