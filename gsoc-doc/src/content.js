import { TopNavbar } from "./sidebar"

function ViewCode(props) {
    let content = props.content;
    if (content === undefined) content = " View File/Commit";
    return (
        <a href={props.href}>{content}</a>
    )
}

function CodeText(props) {
    return (
        <b><i>{props.txt}</i></b>
    )
}

function getEle(id){
    return document.getElementById(id);
}

function GetHeader(props){
    return(
        <div>
            <h4 id={props.id} className={"content-header"} onClick={()=>{getEle(props.id+"-link").click()}}>{props.heading}</h4>
            <a id={props.id+"-link"} name={props.id} href={"#"+props.id}>{}</a>
        </div>
    )
}

function Content() {
    return (
        <div id="content">
            <TopNavbar />

            <GetHeader id = "project-description" heading="Project Description"/>
            
            <p>The Virtual Brain (TVB) is a brain stimulation platform. It offers tools for computing, simulating and analyzing functional and structural data of human brains. TVB provides a graphical user interface (GUI) for using its tools for studying human brains. The platform supports importing data into TVB like projects, data structures etc. Since TVB provides various tools for studying human brains the platform is also accessible through REST APIs. Goal of this project is to create a new package which will consume TVB REST services and perform operations on it. The new python client will have features like uploading data into a TVB, data encryption and validation, build BIDS datasets, monitor directories etc. Users will be able to use this python client to interact with a remote TVB server without using an active GUI.</p>

            <p>Mentors: <ViewCode content="@Paula Popa" href="https://github.com/popaula937"/>&nbsp;<ViewCode content="@Lia Domide" href="https://github.com/liadomide"/></p>
            <div className="line"></div>

            <GetHeader id="update-bids-importer" heading="Milestone 1 - Update BIDS Importer"/>
            <p>
                In this phase we started working on updating the BIDS Importer. BIDS impoter is used to import bids datasets into TVB projcts.
                Goal was to modify the bids importer so that it will also support bids datasets with only single datatype (ts, net, coords, spatial). We're able to achieve this and we also tested the updated bids importer with BIDS datasets containing only time series or connectivity datatypes.
            </p>
            <p>
                To use this custom bids importer, you can refer to the sample code which is also added here:
                <ViewCode href="https://github.com/the-virtual-brain/tvb-root/commit/3ac0399c6ea7564495f19f65af61f906a3372f12" />
            </p>
            <div className="line"></div>

            <GetHeader heading="Milestone 2 - Creating BIDS data builder" id="bids-data-builder"/>
            <p>In the second phase the goal was to build a module which can create datasets from a BIDS directory. The need was to
                design a builder which will create datasets with only required files and no other files. This will also reduce the
                size of the datasets.
            </p>
            <p>Few challenges we faced</p>
            <ul>
                <li>How do we find all the dependencies from json files. There were cases when a json file contains path
                    to another json file and so on.
                    <ul><li>So we came up with an approach similar to BFS traversal, since the connection(of dependencies paths)
                        among json files was forming a graph like structure. View <ViewCode content="get_connected_dependencies_paths" href="https://github.com/Spectre-ak/tvb-root/blob/fce15765cc83fb6ead67568b0c5677227b6e26b5/tvb_framework/tvb/interfaces/rest/bids_monitoring/bids_data_builder.py#L89" /></li></ul>
                </li>
                <li>Finding a way to write files into a zip file with all the directories/sub-directories being preserved.
                    <ul><li>To resolve this we used <CodeText txt="ZipFile" /> which is already in used in TVB importers. View <ViewCode content="create_archive" href="https://github.com/Spectre-ak/tvb-root/blob/fce15765cc83fb6ead67568b0c5677227b6e26b5/tvb_framework/tvb/interfaces/rest/bids_monitoring/bids_data_builder.py#L53" /></li></ul>
                </li>
            </ul>
            <p>Final Outcome: A class named <CodeText txt="BIDSDataBuilder" /> which takes BIDS root directory
                and datatype of which dataset is to be built. <CodeText txt="BIDSDataBuilder" /> can also build dataset from a
                set of intial json files. And the result is a zip file containing the built dataset. </p>
            <p> <ViewCode href="https://github.com/the-virtual-brain/tvb-root/pull/589/files#diff-0429214335d934a9229899b195e39d0e81459c9524d372521ca3982c58170398" content="View BIDSDataBuilder" /></p>
            
            <div className="line"></div>

            <GetHeader id="bids-dir-watcher" heading="Milestone 3 - Creating BIDS Diretory monitor"/>
            <p>
                After building <CodeText txt="BIDSDataBuilder" /> our next goal was to wtite a separate module for observing
                or monitoring a BIDS directory for new files and whenever new files are added then consume <CodeText txt="BIDSDataBuilder " />
                to build a dataset for those files and import them into TVB project. 
            </p>
            <p>So we splitted this this module into two parts</p>
            <ul>
                <li>Watcher - Responsible for monitoring the directories and triggering uploader on new files</li>
                <li>Uploader - Responsible for building the dataset for new files and importing the dataset into TVB project</li>
            </ul>
            <p>Challenges: </p>
            <ul>
                <li>
                    Which library to be used for monitoring directory
                    <ul>
                        <li>
                            We used <CodeText txt="watchdog"/> npm library for monitoring directories and we configured
                            it to detect json files changes only.
                        </li>
                    </ul>
                </li>
                <li>
                    Running background processes
                    <ul><li>We needed the watcher to run in the background and not blocking other processes and similary
                        we needed the uploader to also run in the background. To resolve this we created two parallel threads
                        namely <ViewCode href="https://github.com/Spectre-ak/tvb-root/blob/fce15765cc83fb6ead67568b0c5677227b6e26b5/tvb_framework/tvb/interfaces/rest/bids_monitoring/bids_dir_monitor.py#L98" content="watcher_thread"/> and <ViewCode href="https://github.com/Spectre-ak/tvb-root/blob/fce15765cc83fb6ead67568b0c5677227b6e26b5/tvb_framework/tvb/interfaces/rest/bids_monitoring/bids_dir_monitor.py#L99" content="uploader_thread"/>.</li></ul>
                </li>
            </ul>
            <p>
                Final Outcome: <CodeText txt="BIDSDirWatcher"/> class which takes BIDS directory as argument and monitors 
                that directory for new files. It also takes additional arguments such as tvb project id in which data will
                be imported.

            </p>

            <div className="line"></div>

            <GetHeader heading="Milestone 4 - Testing" id="testing"/> 

            <p>
                Now that we have <CodeText txt="BIDSDirWatcher"/> and <CodeText txt="BIDSDataBuilder" /> as a next step we need
                to test the module properly.
            </p>
            <p>Challenges</p>
            <ul>
                <li>
                    While testing <CodeText txt="BIDSDirWatcher"/> we found a bug in the <ViewCode href="https://github.com/the-virtual-brain/tvb-root/blob/a2181bad1c318e9e49a6d6ffcc18f4f2e112164c/tvb_framework/tvb/adapters/uploaders/bids_importer.py#L124" content="BIDSImporter"/> and
                    because of this the import was not successful. The BIDSImporter was not able to extract the subject folders
                    from the file paths present in a bids zip file. To resolve this we splitted the path in different manner and
                    cheked again if it's a subject directory.
                </li>
            </ul>
            
            <p>Final Outcome: By this part we have our <CodeText txt="BIDSDirWatcher"/> and <CodeText txt="BIDSDataBuilder" /> ready and tested.
            Also added a sample file <ViewCode href="https://github.com/Spectre-ak/tvb-root/blob/tvb-bids-monitoring-gsoc/tvb_framework/tvb/interfaces/rest/bids_monitoring/launch_bids_monitor.py" content="launch_bids_monitor.py"/> for demonstrating how to consume the module. This file can also be used to run BIDSDirWatcher on a directory by passing it as command line arguments.
            </p>

            <div className="line"></div>

            <GetHeader id="code-packaging" heading="Milestone 5 - Packaging the code"/>
            <p>
                This is last stage of the projet which inlcludes packaging the whole code with all dependencies so that it can be installed easily.
            </p>
            <p>So added follwing things</p>
            <ul>
                <li>
                    <ViewCode content="setup_bids_monitor.py" href="https://github.com/Spectre-ak/tvb-root/blob/tvb-bids-monitoring-gsoc/tvb_framework/setup_bids_monitor.py"/>
                </li>
                <li>
                    <ViewCode content="MANIFEST" href="https://github.com/Spectre-ak/tvb-root/blob/tvb-bids-monitoring-gsoc/tvb_framework/MANIFEST_bids_monitor.in"/>
                </li>
                <li>
                    README <ViewCode content="Readme" href="https://github.com/Spectre-ak/tvb-root/blob/tvb-bids-monitoring-gsoc/tvb_framework/tvb/interfaces/rest/bids_monitoring/README.md"/>
                </li>
            </ul>


            <div className="line"></div>

            <GetHeader heading="PRs and code repositries" id="links"/>

            <ul>
                <li>
                    Pull Request: <ViewCode content="(GSoC 2022, 8.2) TVB BIDS data builder and dir monitor module #589" href="https://github.com/the-virtual-brain/tvb-root/pull/589"/>
                </li>
                <li>
                    TVB main repo:  <ViewCode content="the-virtual-brain/tvb-root" href="https://github.com/the-virtual-brain/tvb-root"/>
                </li>
                <li>
                    Forked repo: <ViewCode content="Spectre-ak/tvb-root, tvb-bids-monitoring-gsoc" href="https://github.com/Spectre-ak/tvb-root/tree/tvb-bids-monitoring-gsoc"/>
                </li>
                <li>
                    Code documentation: <ViewCode content="README.md" href="https://github.com/Spectre-ak/tvb-root/blob/tvb-bids-monitoring-gsoc/tvb_framework/tvb/interfaces/rest/bids_monitoring/README.md"/>
                </li>
            </ul>
        </div>
    )
}

export default Content;
