import { Component, NgZone } from "@angular/core"
import { NotificationService, Notification } from "../_shared/_services/notification.service"
@Component({
    selector: 'notification',
    templateUrl: './notification.template.html',
    styleUrls: ['./notification.component.css']
})

export class NotificationComponent {    
    public showNotification: boolean = false;
    public showingNotification: Notification;

    constructor(private _notificationService: NotificationService, private ngZone: NgZone) {
        console.log("NotificationComponent Initalized!");

        this._notificationService.onHide$.subscribe(this.onHide.bind(this));
        this._notificationService.onNotify$.subscribe(this.onNotify.bind(this));

        this.showingNotification = new Notification("", []);
    }

    public onHide(): void {
        this.ngZone.run(() => {
            this.showNotification = false;
            this.showingNotification = new Notification("", []);
        });        
    }

    public onNotify(notification: Notification): void {
        this.ngZone.run(() => {
            this.showNotification = true;
            this.showingNotification = notification;
        });        
    }
}