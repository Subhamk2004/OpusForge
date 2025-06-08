"use client"
import { useEffect, useState, useCallback, useMemo } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useAssetSearch } from "@/hooks/useAssetSearch";
import { useFormData } from "@/hooks/useFormData";
import { usePortfolioDeployment } from "@/hooks/usePortfolioDeployment";
import Header from "@/components/ui/Header";
import FormSection from "@/components/forms/FormSection";
import PortfolioPreview from "@/components/ui/PortfolioPreview";
import { useDispatch } from "react-redux";
import { addPortfolio, updatePortfolio as updatePortfolioInRedux } from "@/store/slices/Portfolios";

function PortfolioBuilderPage({ template, portfolioId, existingPortfolioData }) {

    if (portfolioId) {
        console.log(existingPortfolioData);
    }
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
        formatFieldName
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
            console.log(res);

            if (!res || res.error) {
                toast.error("An error occurred in the process. Please try again.");
                return;
            }
            if (res.isAlreadyCreated) {
                toast.info(`Repository already exists: ${res.repoName}, please update the portfolio.`);
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
                    console.log(portfolioRes);
                    dispatch(addPortfolio(portfolioRes.data));
                    toast.success(`Successfully deployed to ${deployRes.deployedUrl}`);
                    return;
                }
            } else {
                toast.success("Process completed successfully, updates will be deployed soon.");
            }
        }
        else {
            let commitRes = await commitToRepo(finalHtml, existingPortfolioData.repoName);
            if (commitRes.error) {
                toast.error("Error occurred while committing to repository");
                return;
            }
            let updateRes = await updatePortfolio(existingPortfolioData._id, debouncedData);
            console.log(updateRes);

            if (updateRes.error) {
                toast.error("Error occurred while updating portfolio");
                return;
            }
            dispatch(updatePortfolioInRedux(updateRes.data));
            toast.success("Portfolio updated successfully.");
        }

    }, [finalHtml, createRepo, commitToRepo, deployToGithub, createPortfolio, template, debouncedData, updatePortfolio]);

    return (
        <div className='w-screen overflow-hidden h-screen bg-light text-black flex flex-col items-center justify-start'>
            <Header
                searchQuery={searchQuery}
                searchResults={searchResults}
                onSearch={handleSearch}
                repoName={repoName}
                onRepoNameChange={setRepoName}
                onSubmit={startProcess}
            />

            <div className="flex flex-row items-center justify-between p-4 bg-primary text-white seperator w-full h-screen overflow-auto">
                <FormSection
                    formFieldsArray={formFieldsArray}
                    data={data}
                    onInputChange={handleInputChange}
                    formatFieldName={formatFieldName}
                />

                <hr className="h-screen w-[1px] bg-error" />

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