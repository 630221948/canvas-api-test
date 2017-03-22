// TypeScript file

class EventController {

    private static instance: EventController;
    public eventDispacherList: DisplayObject[] = [];
    public toDoEventList: TouchingEvent[] = [];

    public static getInstance() {
        if (!EventController.instance) {
            EventController.instance = new EventController();
        }
        return EventController.instance;
    }

    public executeEvent(e: MouseEvent) {
        for (var i of EventController.getInstance().toDoEventList) {
            i.react(e);
        }
        EventController.getInstance().toDoEventList = [];
    }

}