import { BadRequestException } from "@nestjs/common";
import { PipeTransform } from "@nestjs/common/interfaces/features/pipe-transform.interface";
import { TaskStatus } from "../task.model";

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ];


  transform(value: any/*, metadata: ArgumentMetadata*/) {
    const status = value.toUpperCase();

    if (!this.isStatusValid(status)) {
      throw new BadRequestException(`"${status}" is an invalid status`);
    }

    return status;
  }

  private isStatusValid(status: any) {
    return this.allowedStatuses.indexOf(status) !== -1;
  }

}