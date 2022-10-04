import { BASE_TIMER_MINUTES } from "./constants.js";

export class Timer
{
    constructor(minutes=BASE_TIMER_MINUTES)
    {
        this.baseTurnTimeInSeconds = 60 * minutes;
        this.timer = this.baseTurnTimeInSeconds;
    }
    getTimer()
    {
        return this.timer;
    }
    substractTimer()
    {
        if (this.timer > 0)
        {
            this.timer -= 1;
        }
    }
    resetTimer()
    {
        this.timer = this.baseTurnTimeInSeconds;
    }
}