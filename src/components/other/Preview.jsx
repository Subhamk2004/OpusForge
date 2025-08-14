"use client"
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { useAssetSearch } from "@/hooks/useAssetSearch";
import { useFormData } from "@/hooks/useFormData";
import { usePortfolioDeployment } from "@/hooks/usePortfolioDeployment";
import Header from "@/components/ui/Header";
import FormSection from "@/components/forms/FormSection";
import PortfolioPreview from "@/components/ui/PortfolioPreview";
import { useDispatch } from "react-redux";
import { addPortfolio, updatePortfolio as updatePortfolioInRedux } from "@/store/slices/Portfolios";
import { useRouter } from "next/navigation";
import Root from "../AI/Root";

function PortfolioBuilderPage({ template, portfolioId, existingPortfolioData, demo }) {

    if (portfolioId) {
        // console.log(existingPortfolioData);
    }
    const [aiPopulatedData, setAiPopulatedData] = useState(null);
    let router = useRouter();
    const { assets } = useSelector((state) => state.assets);
    const [finalHtml, setFinalHtml] = useState("");
    const [loadedAssets, setLoadedAssets] = useState([]);
    let dispatch = useDispatch();
    const { searchQuery, searchResults, handleSearch } = useAssetSearch(loadedAssets);

    const {
        data,
        debouncedData,
        formFieldsArray,
        handleInputChange,
        formatFieldName,
        updateFromAI
    } = useFormData(template, existingPortfolioData.userData || {});
    const {
        repoName,
        setRepoName,
        createRepo,
        commitToRepo,
        deployToGithub,
        createPortfolio,
        updatePortfolio,
    } = usePortfolioDeployment(portfolioId || null, existingPortfolioData);

    const handleAIDataPopulated = useCallback((populatedData) => {
        // Update the form data with AI populated data
        updateFromAI(populatedData);
        toast.success("Form fields updated with resume data!");
    }, [updateFromAI]);

    useEffect(() => {
        if (assets && assets.length > 0) {
            setLoadedAssets(assets[0]);
        }
    }, [assets]);

    const memoizedSetFinalHtml = useCallback((html) => {
        setFinalHtml(html);
    }, []);

    const memoizedTemplate = useMemo(() => template, [template]);

    const startProcess = useCallback(async () => {
        if (portfolioId == null) {
            let res = await createRepo(finalHtml);
            // console.log(res);

            if (!res || res.error) {
                toast.error("An error occurred in the process. Please try again.");
                return;
            }
            if (res.isAlreadyCreated) {
                toast.info(`Repository already exists: ${res.repoName}, please update the portfolio.`);
                setTimeout(() => {
                    router.push(`/user`);
                }, 6000)
                return;
            }

            let commitRes = await commitToRepo(finalHtml, res.repoName);
            if (commitRes.error) {
                toast.error("Error occurred while commit process");
                return;
            }

            if (!res.isDeployed) {
                let deployRes = await deployToGithub(commitRes.repoName);
                if (deployRes.error) {
                    toast.error("Error occurred while deploying to Github Pages");
                } else {
                    let portfolioRes = await createPortfolio(deployRes.deployedUrl, template, debouncedData, commitRes.repoName);
                    // console.log(portfolioRes);
                    dispatch(addPortfolio(portfolioRes.data));
                    toast.success(`Successfully deployed to ${deployRes.deployedUrl}`);
                    setTimeout(() => {
                        router.push(`/user`);
                    }, 6000);
                    return;
                }
            } else {
                toast.success("Process completed successfully, updates will be deployed soon.");
                setTimeout(() => {
                    router.push(`/user`);
                }, 6000)
            }
        }
        else {
            let commitRes = await commitToRepo(finalHtml, existingPortfolioData.repoName);
            if (commitRes.error) {
                toast.error("Error occurred while committing to repository");
                return;
            }
            let updateRes = await updatePortfolio(existingPortfolioData._id, debouncedData);
            // console.log(updateRes);

            if (updateRes.error) {
                toast.error("Error occurred while updating portfolio");
                return;
            }
            dispatch(updatePortfolioInRedux(updateRes.data));
            toast.success("Portfolio updated successfully.");
            setTimeout(() => {
                router.push(`/user`);
            }, 6000)
        }

    }, [finalHtml, createRepo, commitToRepo, deployToGithub, createPortfolio, template, debouncedData, updatePortfolio]);

    // console.log(debouncedData);

    return (
        <div className='w-screen overflow-hidden h-screen bg-light text-black flex flex-col items-center justify-start mt-2 md:mt-0'>
            {/* <ToastContainer /> */}
            <Header
                searchQuery={searchQuery}
                searchResults={searchResults}
                onSearch={handleSearch}
                repoName={repoName}
                onRepoNameChange={setRepoName}
                onSubmit={startProcess}
                demo={demo}
                userData={debouncedData}
                onAIDataPopulated={handleAIDataPopulated}
            />

            <div className="flex flex-col md:flex-row items-center md:justify-between md:p-6 bg-light text-white seperator w-full h-screen overflow-auto md:pt-12  border-t border-black">
                <FormSection
                    formFieldsArray={formFieldsArray}
                    data={data}
                    onInputChange={handleInputChange}
                    formatFieldName={formatFieldName}
                />

                <hr className=" flex h-[0px] w-full md:h-screen md:w-[0px] border-textp border-[0.1px] mt-2 mb-2" />

                <PortfolioPreview
                    userData={debouncedData}
                    template={memoizedTemplate}
                    setHtml={memoizedSetFinalHtml}
                />
            </div>
        </div>
    );
}

export default PortfolioBuilderPage;