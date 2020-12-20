class Rope{
    constructor(body1, pointB){
        var options = {
            bodyA:body1,
            pointB:pointB,
            stiffness:0.004,
            length:1
        }

        this.rope = Constraint.create(options);
        this.pointB = pointB;
        World.add(world, this.rope);
    }

    display(){
        if(this.rope.bodyA){
            var posA = this.rope.bodyA.position;
            var pointB = this.pointB;

            strokeWeight(3);
            line(posA.x, posA.y, pointB.x, pointB.y);
        }
    }

    fly(){
        this.rope.bodyA = null;
    }

    attach(body){
        this.rope.bodyA = body;
    }
}