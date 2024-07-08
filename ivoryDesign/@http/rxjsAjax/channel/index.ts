import { Subject } from 'rxjs';

/*
使用RxJS Subject创建一个频道

@example

订阅频道
const subscription = channel.subscribe(action => {})
给频道发送一个广播
channel.next(createAction('customEvent', payload))
channel.error(createAction('customEvent', payload))
取消订阅
subscription.unsubscribe()

*/

function createChannel<TSubject = Subject<any>>(ChanelClass: any = Subject): TSubject {
    return new ChanelClass();
}

const requestChannel = createChannel();
export default requestChannel;
