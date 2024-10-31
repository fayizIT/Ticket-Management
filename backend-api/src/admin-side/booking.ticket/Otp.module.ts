import { Module } from '@nestjs/common';
import { OtpService } from './OtpService';


@Module({
    providers: [OtpService],
    exports: [OtpService], // Make sure to export it
})
export class OtpModule {}
