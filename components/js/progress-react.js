/**
 * Created by nathanlawrence on 8/25/17.
 */

var documentSections = [];



$(document).ready(function() {

    var ProgressSegment = React.createClass({
        render: function() {
            return (
                <div className="segment">
                    <ul className="segment">
                        <a href={"#" + this.props.id}><li className={"drop " + (this.props.pastTop ? "active" : "inactive")}> <span className="label">{this.props.title}</span></li></a>
                        {this.props.waypoints.map(function(wp){
                            return (
                                <li className={"droplet " + (wp ? "active" : "inactive")}></li>
                            )
                        }, this)}
                    </ul>
                </div>
            )
        }
    });

    var ProgressApp = React.createClass({

        getInitialState: function () {
            return {
                sections: []
            }
        },

        componentDidMount() {
            this.updateDocumentSections();
            addEventListener('scroll', () => this.updateDocumentSections());
        },

        render: function () {
            return (
                <div>
                    {this.state.sections.map(function(section) {
                        return (
                            <ProgressSegment
                                id={section.id}
                                title={section.title}
                                isLastSection={false}
                                waypoints={section.waypoints}
                                pastTop={section.pastTop}
                            />
                        )
                    }, this)}
                    <ul className="segment">
                        <li className="drop"></li>
                    </ul>
                </div>
            )
        },


        updateDocumentSections: function() {

            let sectionsReturnable = [];

            $("section").each(function(i){

                const numWaypoints = 4;

                let sectionTop = $(this).offset().top;
                let sectionHeight = $(this).height();
                let sectionBottom = sectionHeight + sectionTop;
                let scrollPosition = $(document).scrollTop();
                let scrollBottom = $(document).scrollTop() + $(window).height();
                let sectionActive = false;
                let pastTop = false;
                let sectionWaypoints = [];

                if (scrollBottom >= sectionTop) {
                    pastTop = true;

                    if (scrollBottom <= sectionBottom) {
                        sectionActive = true;

                        let progressScaled = ((scrollBottom - sectionTop)/sectionBottom) * numWaypoints;

                        for (let i = 0; i < numWaypoints; i++){
                            if (i <= progressScaled) {
                                sectionWaypoints.push(true);
                            }
                            else {
                                sectionWaypoints.push(false);
                            }
                        }
                    }
                    else {
                        for (let i = 0; i < numWaypoints; i++){
                            sectionWaypoints.push(true);
                        }
                    }

                }
                else {
                    for (let i = 0; i < numWaypoints; i++){
                        sectionWaypoints.push(false);
                    }
                }


                sectionsReturnable.push({
                    title: $(this).data("title"),
                    id: this.id,
                    order: i,
                    top: sectionTop,
                    bottom: sectionBottom,
                    height: sectionHeight,
                    waypoints: sectionWaypoints,
                    pastTop: pastTop
                });

            });

            this.setState({sections: sectionsReturnable});

            if ($(document).scrollTop() > sectionsReturnable[0].top - 100){
                $("#reactive-progress-hider").removeClass("hidden");
            }
            else {
                $("#reactive-progress-hider").addClass("hidden");
            }

        }

    });

    ReactDOM.render(<ProgressApp/>, document.getElementById('reactive-progress'));



    $(document).mousemove(debounce(250, false, function(event){


        let progressRight = $("#reactive-progress").offset().left + $("#reactive-progress").width();

        if (event.pageY < $(window).height()){
            return false;
        }

        if (event.pageX < progressRight){
            $("article").animate({
                "opacity": 0.1
            }, 600);
        }
        else {
            $("article").animate({
                        "opacity": 1
            }, 1000);
        }

    }));
});