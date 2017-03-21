var Scene = require("../Constructors/scene");

var level3 = new Scene(16);

level3.plan = [
    "################################################################",
    "#              #           #                                   #",
    "#              #           #      *                     *      #",
    "#    *    *    #           #                                   #",
    "#              #           #                                   #",
    "# *  ######  * #           #     #       #########       #     #",
    "#    #    #    #     #     #     ##       #     #       ##     #",
    "#    # @  #    #  *  #     #     # #       #   #       # #     #",
    "#    #    #    #     #     #     #  #       # #       #  #     #",
    "# *  #    #  * #######     #     #   #       #       #   #     #",
    "#              #     #     #     #    #             #    #     #",
    "#    *    *    #     #     #     #     #           #     #     #",
    "#              #           #     #     #           #     #     #",
    "#              #           #     #    #             #    #     #",
    "#######        #           #     #   #       #       #   #     #",
    "#              #           #     #  #       # #       #  #     #",
    "#         *    #     #     #     # #       #   #       # #     #",
    "#              #     #     #     ##       #     #       ##     #",
    "#              #     #######     #       #########       #     #",
    "#        #######                                               #",
    "#              #                                               #",
    "#    *         #                  *                     *      #",
    "#              #                                               #",
    "#              ###########################################  *  #",
    "#######        #  #  #  #  #  #  #  #  #  #  #           #     #",
    "#              #  #  #     #  #  #     #                 #     #",
    "#         *    #     #     #     #                       #     #",
    "#              #           #                             #     #",
    "#              #                                   #     #     #",
    "#        #######                             #     #     #     #",
    "#                                      #     #     #     #  *  #",
    "#                                #     #     #     #           #",
    "#    *                     #     #     #     #                 #",
    "#                    #  *  #     #  *           *              #",
    "#              #     #     #     #                             #",
    "################################################################"
];

level3.timer = 60;
level3.hiScore = 5000;      // temp solution

level3.playerData.color = "white";

level3.colors = {
    background: "grey",
    wall: "green",
    pellet: "gold"
};

level3.planReader();

module.exports = level3;
