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
function Content() {
    return (
        <div id="content">
            <TopNavbar />

            <h3>Project Description</h3>
            <p>The Virtual Brain (TVB) is a brain stimulation platform. It offers tools for computing, simulating and analyzing functional and structural data of human brains. TVB provides a graphical user interface (GUI) for using its tools for studying human brains. The platform supports importing data into TVB like projects, data structures etc. Since TVB provides various tools for studying human brains the platform is also accessible through REST APIs. Goal of this project is to create a new package which will consume TVB REST services and perform operations on it. The new python client will have features like uploading data into a TVB, data encryption and validation, build BIDS datasets, monitor directories etc. Users will be able to use this python client to interact with a remote TVB server without using an active GUI.</p>

            <div className="line"></div>

            <h3>Milestone 1 - Update BIDS Importer</h3>
            <p>
                In this phase we started working on updating the BIDS Importer. BIDS impoter is used to import bids datasets into TVB projcts.
                Goal was to modify the bids importer so that it will also support bids datasets with only single datatype (ts, net, coords, spatial). We're able to achieve this and we also tested the updated bids importer with BIDS datasets containing only time series or connectivity datatypes.
            </p>
            <p>
                To use this custom bids importer, you can refer to the sample code which is also added here:
                <ViewCode href="https://github.com/the-virtual-brain/tvb-root/commit/3ac0399c6ea7564495f19f65af61f906a3372f12" />
            </p>
            <div className="line"></div>

            <h3>Milestone 2 - Creating BIDS data builder</h3>
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

            <h3>Milestone 3 - Creating BIDS Diretory monitor</h3>
            {/* third phaseA+
                yeh milestone 2 me jo bids data builder bana hai usko base leke bana haii,
                challenges jo jo aaya wo sab dal yaha pe bhaiii,
                1. using proper library for watching,
                1.5 using background and threds to handle two workers...
                2. writing code to detect changes in the subject directories only and rest discard them
                3. */}
            <p>
                After building <CodeText txt="BIDSDataBuilder" /> our next goal was to wtite a separate module for observing
                or monitoring a BIDS directory for new files and whenever new files are added then consume <CodeText txt="BIDSDataBuilder" />
                to build a dataset for those files and import them into TVB project. So we splitted this this module into two parts
                <ul>
                    <li>Watcher - Responsible for monitoring the directories and triggering uploader on new files</li>
                    <li>Uploader - Responsible for building the dataset for new files and importing the dataset into TVB project</li>
                </ul>
            </p>
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
                    <ul><li>We needed the Watcher to run in the background and not blocking other processes and similary
                        we needed the uploader to also run in the background. To resolve this we created two parallel threads
                        namely watcher_thread and uploader_thread.</li></ul>
                </li>
            </ul>
            <h3>Milestone 4 - Tesdting the module</h3>
            <p>
                {/* 4th phase
                yaha pe dalne hai ki module ko humne test kara and problem aaya
                bids importer me, so usko waps update krna pada
                paula ko code id dal dena
                added  sample code to show how to use */}

            </p>

            By this part we have our bidsdatabuilder and bidsDIrwarcher are ready and tested


            <h3>Milestone 5 - Packaging the code</h3>
            <p>5th phase
            </p>


        </div>
    )
}

export default Content;
