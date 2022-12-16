import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificationBody {
  @IsNotEmpty()
  @IsUUID()
  recipient_id: string;

  @IsNotEmpty()
  @Length(5, 300)
  content: string;

  @IsNotEmpty()
  category: string;
}
